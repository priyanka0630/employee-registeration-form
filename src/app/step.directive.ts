import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit,
  } from '@angular/core';
  import { UserService } from './_service';
  
  @Directive({
    selector: '[progressStepNext], [progressStepPrev]',
  })
  export class StepDirective implements OnInit {
    @Input('progressStepNext') next;
    @Input('progressStepPrev') prev;
  
    private methods = {
      next: false,
      prev: false,
    };
  
    @HostListener('click', ['$event']) listen(e) {
      this.progressHelper.eventHelper.next(this.methods);
    }
  
    constructor(
      private progressHelper: UserService,
      private el: ElementRef<HTMLButtonElement>
    ) {}
  
    ngOnInit() {
      this.initMethods();
    }
  
    private initMethods(): void {
      if ('next' in this) {
        this.methods = {
          ...this.methods,
          next: true,
        };
      }
  
      if ('prev' in this) {
        this.methods = {
          ...this.methods,
          prev: true,
        };
      }
    }
  }