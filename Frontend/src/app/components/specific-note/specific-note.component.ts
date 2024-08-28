import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-specific-note',
  templateUrl: './specific-note.component.html',
  styleUrls: ['./specific-note.component.css']
})
export class SpecificNoteComponent {

  note: any;
  private editNote: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<SpecificNoteComponent>) {
    this.note = data.note;    
  }

  closeDialog(value: string){
    if(value === 'download'){
      this.download();
      return;
    }
    else if(value === 'update'){
      this.updateNote();
    }
    else if(value === 'cancel'){
      this.cancel();
    }
  }

  private cancel() {
    this.editNote = {
      note: this.data.note,
      status: "no"
    }
    this.dialogRef.close(this.editNote);
  }
  private updateNote(){
    this.editNote ={
      note: this.data.note,
      status: "yes"
    }
    this.dialogRef.close(this.editNote);
  }

  private download(){
    const textToSave = `Title: ${this.data.note.noteTitle}\n\nContent: ${this.data.note.content}`;
    const blob = new Blob([textToSave], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'note.txt');
  }
}
