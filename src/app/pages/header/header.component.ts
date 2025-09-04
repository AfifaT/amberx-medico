import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    menuOpen = false;

    constructor(private _eref: ElementRef
    ) { }

    ngOnInit(): void {
    }

    toggleMenu(): void {
        this.menuOpen = !this.menuOpen;
    }
    closeMenu(): void {
        this.menuOpen = false;
    }
    // Close hamburger when clicked anywhere outside
    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent) {
        if (
            this.menuOpen &&
            !this._eref.nativeElement.contains(event.target)
        ) {
            this.closeMenu();
        }
    }

}
