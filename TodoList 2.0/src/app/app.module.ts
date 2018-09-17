import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppFormComponent } from './components/./form/form.component';
import { AppTodoListComponent } from './components/./todo-list/./todo-list.component';
import { AppTodoItemComponent } from './components/./todo-item/todo-item.component';
import { ShareService } from './services/share.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent, AppFormComponent, AppTodoListComponent, AppTodoItemComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [ShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
