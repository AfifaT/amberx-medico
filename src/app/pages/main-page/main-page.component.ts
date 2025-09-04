import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
    images: string[] = [
        'assets/images/pharmacy (1).png',
        'assets/images/pharmacy (2).png',
        'assets/images/pharmacy (3).png',
        'assets/images/pharmacy (4).png',
        'assets/images/pharmacy (5).png'
    ];

    currentIndex = 0;
    intervalId: any;

    sections: string[] = ['hero', 'about', 'services', 'contact'];


    ngOnInit(): void {
        this.startAutoSlide();

        this.setActiveLink(); // highlight Home initially
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
    }

    startAutoSlide(): void {
        this.intervalId = setInterval(() => {
            this.nextSlide();
        }, 3000); // slide every 3 seconds
    }

    nextSlide(): void {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }

    prevSlide(): void {
        this.currentIndex =
            (this.currentIndex - 1 + this.images.length) % this.images.length;
    }

    goToSlide(index: number): void {
        this.currentIndex = index;
    }

    // Listen for scroll events
    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.setActiveLink();
    }

    private setActiveLink() {
        let scrollPos = window.scrollY + 150; // offset for header height
        this.sections.forEach(id => {
            const section = document.getElementById(id);
            const link = document.querySelector(`.nav a[href="#${id}"]`);
            if (section && link) {
                if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                    document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }
}
