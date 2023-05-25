import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {ChatjptService} from "../service/chatjpt/chatjpt.service";

@Component({
  selector: 'app-chatjpt',
  templateUrl: './chatjpt.component.html',
  styleUrls: ['./chatjpt.component.css']
})
export class ChatjptComponent implements OnInit {
  answer:string[]=[];
  question:string[]=[];
  url = 'assets/js/scripts/jquery.js';
  loadAPI: any;
  currentDateTime: string;
  isDropDownMenuOpen: boolean = false;
  mapQA : Map<string, string> = new Map<string, string>();
  constructor(private renderer: Renderer2,private elRef: ElementRef,private chatGPTService: ChatjptService,
              private router: Router,private localLocation : Location) {
    let now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    this.currentDateTime = now.toLocaleDateString('en-US', options);

  }
  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  ngOnInit(): void {
    // this.loadAPI = new Promise(resolve => {
    //   this.loadScript();
    // });
    this.chatGPTService.changeMessage.subscribe(data=>{
      this.chatGPTService.askMenu().subscribe(data=>{
        this.answer.push(data.choices[0].text.trim());
        this.mapQA.set(this.chatGPTService.getMessage(),data.choices[0].text.trim());
      })
    });
    // this.getCurentUser();
  }
  loadChatGPT(){
    window.addEventListener("DOMContentLoaded", (event) => {
      const closeChatEl = this.elRef.nativeElement.querySelector('.close-chat');
      const avatarEl = this.elRef.nativeElement.querySelector('.avatar');
      const dropDownMenuEl = this.elRef.nativeElement.querySelector('.drop-down-menu');
      avatarEl.addEventListener('click', () => {
        dropDownMenuEl.slideToggle();
      });
    });

  }

  getGPT(value: string) {
    this.question.push(value);
    this.mapQA.set(value,"");
    console.log("vl" + value);
    (document.getElementById("questionGPTId") as HTMLInputElement).value="";
    this.chatGPTService.askQuestion(value).subscribe(data=>{
      this.answer.push(data.choices[0].text.trim());
      this.mapQA.set(value,data.choices[0].text.trim());
    })
  }
  // getCurentUser(){
  //   if(localStorage.getItem('token')){
  //     this.userService.getUserCurrent().subscribe(data=>{
  //       this.userCurrent = data;
  //     })
  //   }
  // }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(["/login"]);
  }
  openGPT() {
    const chatbotContainerEl = this.elRef.nativeElement.querySelector('.chatbot-container');
    const iconChatbotEl = this.elRef.nativeElement.querySelector('.icon-chatbot');
    if (window.getComputedStyle(chatbotContainerEl).getPropertyValue('opacity') === '0') {
      chatbotContainerEl.style.animation = 'show 0.5s ease-in-out forwards';
    } else {
      chatbotContainerEl.style.animation = 'hide 0.5s ease-in-out forwards';
    }
  }
  closeGPT() {
    const closeChatEl = this.elRef.nativeElement.querySelector('.close-chat');
    const avatarEl = this.elRef.nativeElement.querySelector('.avatar');
    const dropDownMenuEl = this.elRef.nativeElement.querySelector('.drop-down-menu');
    this.elRef.nativeElement.querySelector('.chatbot-container').style.animation = 'hide 0.5s ease-in-out forwards';
  }
  userChoice() {
    this.isDropDownMenuOpen = !this.isDropDownMenuOpen;
  }
}
