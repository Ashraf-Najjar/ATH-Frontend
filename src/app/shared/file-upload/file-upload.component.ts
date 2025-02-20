import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() multi = false; // Single or multiple files
  @Input() allowedTypes: string[] = []; // Allowed file types (optional)
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  files: File[] = [];
  filePaths: any[] = []; // Stores uploaded file paths
  uploadProgress = 0;
  isUploading = false;
  errorMessage: string | null = null; // Store error message

  onChange: (value: string | string[] | null) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private fileUploadService: FileUploadService) {}

  /**
   * Handles file selection
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFileSelection(Array.from(input.files));
    }
  }

  /**
   * Handles file drop event
   */
  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.handleFileSelection(Array.from(event.dataTransfer.files));
    }
  }

  /**
   * Uploads the selected file(s) and updates the form control value
   */
  private handleFileSelection(selectedFiles: File[]): void {
    // Filter duplicates and invalid types
    const newFiles = selectedFiles.filter(file => 
      (!this.files.some(f => f.name === file.name)) &&
      (this.allowedTypes.length === 0 || this.allowedTypes.includes(file.type))
    );

    if (!newFiles.length) {
      this.errorMessage = "Invalid file type or duplicate file!";
      return;
    }

    this.files = this.multi ? [...this.files, ...newFiles] : [newFiles[0]];
    this.uploadFiles();
  }

  /**
   * Uploads the selected files and replaces form value with uploaded paths
   */
  private uploadFiles(): void {
    if (!this.files.length) return;

    this.isUploading = true;
    this.uploadProgress = 0;
    this.errorMessage = null; // Reset error message

    const upload$ = this.multi
      ? this.fileUploadService.uploadMultipleFiles(this.files)
      : this.fileUploadService.uploadFile(this.files[0]);

    upload$.subscribe({
      next: (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.total) {
              this.uploadProgress = Math.round((100 * event.loaded) / event.total);
            }
            break;
          case HttpEventType.Response:
            this.isUploading = false;
            this.filePaths = this.multi ? event.body.files : [event.body.file];
            this.onChange(this.multi ? this.filePaths : this.filePaths[0]); // Update form control value
            break;
        }
      },
      error: (err) => {
        this.isUploading = false;
        this.errorMessage = "File upload failed. Please try again.";
        console.error("Upload error:", err);
      }
    });
  }

  /**
   * Clears selected files
   */
  clearFile(file?: string): void {
    if (!file) return;
    this.filePaths = this.filePaths.filter(f => f !== file);
    this.files = this.files.filter(f => f.name !== file);
    this.onChange(this.filePaths.length ? (this.multi ? this.filePaths : this.filePaths[0]) : null);
  }

  /**
   * Implements ControlValueAccessor methods
   */
  writeValue(value: string | string[] | null): void {
    this.filePaths = value ? (Array.isArray(value) ? value : [value]) : [];
    this.files = this.filePaths;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.fileInput?.nativeElement)
      this.fileInput.nativeElement.disabled = isDisabled;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  /**
   * TrackBy function for better performance
   */
  trackByFile(index: number, item: string): string {
    return item;
  }
}
