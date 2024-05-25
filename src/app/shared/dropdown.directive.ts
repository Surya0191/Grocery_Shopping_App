import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: "[appDropdown]"
})

export class DropdownDirective{

    constructor(private elementRef:ElementRef){}

    @HostBinding("class.open") isOpen:boolean = false;

    @HostListener("document:click", ['$event']) toggleOpen(event:Event){
        this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }

}