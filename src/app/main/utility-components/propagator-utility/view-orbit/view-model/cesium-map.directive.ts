import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { OnInit } from '@angular/core';
import {
  Cartesian3,
  Color,
  Viewer,
  PolylineOutlineMaterialProperty,
  SceneMode,
} from 'cesium';

@Directive({
  selector: '[fdsCesiumMap]',
  standalone: true,
})
export class CesiumMapDirective implements OnInit, OnChanges {
  viewer: Viewer;
  constructor(private el: ElementRef) {
    this.viewer = new Viewer(this.el.nativeElement);
    this.viewer.scene.mode = SceneMode.SCENE2D;
    this.viewer.fullscreenButton.destroy();
    this.viewer.camera.maximumZoomFactor = 1;
  }

  @Input() cameraZoom: number = 36000000;
  @Input() name: string = '';
  @Input() satPos1X: number = 0;
  @Input() satPos1Y: number = 0;
  @Input() satPos2X: number = 0;
  @Input() satPos2Y: number = 0;

  ngOnInit(): void {
    this.viewer.camera.zoomOut(this.cameraZoom);
    this.viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(
        this.satPos1X,
        this.satPos1Y,
        this.viewer.camera.positionCartographic.height
      ),
    });
    this.addPoint(this.satPos1X, this.satPos1Y);
    this.addPoint(this.satPos2X, this.satPos2Y);
    this.addLine(this.satPos1X, this.satPos1Y, this.satPos2X, this.satPos2Y);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cameraZoom'].isFirstChange()) {
      this.viewer.camera.zoomIn(changes['cameraZoom'].currentValue);
    } else if (
      changes['cameraZoom'].currentValue > changes['cameraZoom'].previousValue
    ) {
      //zoom out
      this.viewer.camera.zoomOut(
        changes['cameraZoom'].currentValue - changes['cameraZoom'].previousValue
      );
    } else {
      this.viewer.camera.zoomIn(
        changes['cameraZoom'].previousValue - changes['cameraZoom'].currentValue
      );
    }
  }

  /**
   * Creates and adds a point entity to the Cesium viewer.
   *
   * @param x the X degree of the point
   * @param y the Y degree of the point
   */
  addPoint(x: number, y: number) {
    this.viewer.entities.add({
      position: Cartesian3.fromDegrees(x, y),
      point: {
        pixelSize: 5,
        color: Color.fromCssColorString('#1b2d3e'),
        outlineColor: Color.fromCssColorString('#00c7cb'),
        outlineWidth: 2,
      },
    });
  }

  /**
   * Draws a line between the two given points.
   *
   * @param x1 satPos1X - the X degree of the first point
   * @param y1 satPos1Y - the Y degree of the first point
   * @param x2 satPos2X - the X degree of the second point
   * @param y2 satPos2Y - the Y degree of the second point
   */
  addLine(x1: number, y1: number, x2: number, y2: number) {
    this.viewer.entities.add({
      name: this.name,
      polyline: {
        positions: Cartesian3.fromDegreesArrayHeights([
          x1,
          y1,
          250000,
          x2,
          y2,
          250000,
        ]),
        width: 5,
        material: new PolylineOutlineMaterialProperty({
          color: Color.fromCssColorString('#00c7cb'),
          outlineWidth: 2,
          outlineColor: Color.BLACK,
        }),
      },
    });
  }
}
