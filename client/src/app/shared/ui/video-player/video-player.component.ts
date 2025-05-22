import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
})
export class VideoPlayerComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLDivElement>;

  @Input() videoSource!: string;

  videoHeight: number | undefined;
  videoWidth: number | undefined;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize(): void {
    if (this.videoPlayer) {
      this.videoWidth = Math.min(
        this.videoPlayer.nativeElement.clientWidth,
        1200
      );
      this.videoHeight = this.videoWidth * 0.5625;
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize.bind(this));
  }
}
