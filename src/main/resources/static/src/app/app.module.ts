import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { PessoaListaComponent } from './pessoa-lista/pessoa-lista.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import { SidebarComponent } from './sidebar/sidebar.component';
import { LivroCadastroComponent } from './livro-cadastro/livro-cadastro.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PessoaListaComponent,
    SidebarComponent,
    LivroCadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
