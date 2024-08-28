import { Component, Input, OnInit, enableProdMode } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpecificNoteComponent } from '../specific-note/specific-note.component';
import { AddNoteComponent } from '../add-note/add-note.component';
import { environment } from 'src/environment/environment';
import { NotesService } from 'src/app/service/notes.service';
import { getUserDetails } from 'src/model/logged-in';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { BannerMessage } from 'src/model/banner-message';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent{

  
  blurBackground: boolean = false;
  emptyImage: any;
  allNotes: any[] = [];
  private notePosInModel: any;
  private bannerMessage: BannerMessage | undefined;

  emptyNotesImage = environment.images.emptyNotes;

    constructor(public dialog: MatDialog, private notesService: NotesService){
      if(getUserDetails()){
        const email = {
          userEmail: getUserDetails().userEmail
        }
        this.notesService.getAllNotes(email).subscribe((response: any)=>{
          this.allNotes = response;
          if(this.allNotes === undefined || (this.allNotes && this.allNotes.length <= 0)){
            this.emptyImage = true;
          }
          else{
            this.emptyImage = false;
          }
        })
        this.bannerMessage = new BannerMessage();
      }
      
    }

  addNote(){
    this.openAddDialog('500ms', '100ms');
  }
  private openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.blurBackground = true;    
    const addDialogRef = this.dialog.open(AddNoteComponent, {
      height: 'auto',
      width: '800px',
      disableClose: true,
      enterAnimationDuration,
      exitAnimationDuration,
    });
    addDialogRef.afterClosed().subscribe(response =>{
      this.blurBackground = false;   
      if(response != undefined){
        console.log(response);
        
        this.allNotes.push(response.newNote);
        if(this.allNotes.length >= 1){
          this.emptyImage = false;
        }
      }
    })
  }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, noteId: number): void {
    this.blurBackground = true;
    const editDialogRef = this.dialog.open(SpecificNoteComponent, {
      height: 'auto',
      width: '800px',
      disableClose: true,
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        note: this.notePositionInArray(noteId)
      }
    });
    editDialogRef.afterClosed().subscribe((response: any) => {
      this.blurBackground = false;
      if (response.status === "yes") {
        const editNote = {
          notesId:response.note.notesId,
          noteTitle: response.note.noteTitle,
          content: response.note.content
        }
        
        this.notesService.editNote(editNote).subscribe((response: any)=>{
          this.allNotes[this.notePosInModel] = response;
          
        })
      }
    });
  }

  private notePositionInArray(noteId: number){
    const notes = this.allNotes;
    for(let i=0;i<notes.length; i++){
      if(notes[i].notesId == noteId){
        this.notePosInModel = i;
        return notes[i];
      }
    }
    return null;
  }

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, noteId: number): void {
    this.blurBackground = true;
    const deleteDialogRef = this.dialog.open(DeleteDialogComponent, {
      height: 'auto',
      width: 'auto',
      disableClose: true,
      enterAnimationDuration,
      exitAnimationDuration,
    });

    deleteDialogRef.afterClosed().subscribe((response: any)=>{
      this.blurBackground = false;
      if(response.status === "yes"){
        const deleteNoteId = this.allNotes.findIndex(note => note.notesId === noteId);
        if (deleteNoteId !== -1) {
          const deleteNote = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: {
              notesId : deleteNoteId, 
              userEmail: getUserDetails().userEmail
            }
          }
          console.log(deleteNote)
          this.notesService.deleteNote(deleteNote).subscribe((response: any) =>{            
            if(response){
              this.allNotes.splice(deleteNoteId, 1); 
              this.bannerMessage?.getSuccessMessage(environment.success.deleteSuccess);
              if(this.allNotes.length <= 0){
                this.emptyImage = true;
              }
              else{
                this.emptyImage = false;
              }
            }
          })
        }
      }
    })
  }
}
