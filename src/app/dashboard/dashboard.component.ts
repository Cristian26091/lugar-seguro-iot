import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { SensorService } from '../service/sensor.service';
import { map } from 'rxjs/operators';
import { SensorData } from '../service/sensor.service';

interface Sensor {
  sensor: string;
  value: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sensors?: SensorData[];
  sensorMax: any = new Object();
  

  constructor(private sensorService : SensorService) { 
    this.retrieveSensors();
    // console.log(this.sensors);
  }

  retrieveSensors(): void {
    this.sensorService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.sensors = data;
      let countArray = data.reduce((acc, child) => { //reduce es una funcion que recibe un callback y un valor inicial
        acc[child.sensor] = (acc[child.sensor] || 0) + 1; //si no existe el sensor, lo crea y le asigna 1, si existe le suma 1
        return acc;
      }, {});
      
      let objectEntries = Object.entries(countArray); //transforma el objeto en un array
      console.log(objectEntries)
      let maximo = this.buscarMaximo(objectEntries);
      console.log(maximo)
      this.sensorMax = maximo;

      // console.log('El máximo valor es:', maximo);
      // console.log(maximo)
      // console.log(objectEntries);
    });
  }

  buscarMaximo(lista) {
    let maximo = -Infinity;
    let nombreMaximo = '';
    let valorMaximo = 0;
  
    for (let i = 0; i < lista.length; i++) {
      const nombre = lista[i][0];
      const valor = lista[i][1];
  
      if (valor > maximo) {
        maximo = valor;
        nombreMaximo = nombre;
        valorMaximo = valor;
    }
  }
  
    return { sensor: nombreMaximo, cantidad: valorMaximo };
  }

  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {

      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Ssabado', 'Domingo'],
        series: [
          [542, 443, 320, 780, 553, 453, 326]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
  }

}
