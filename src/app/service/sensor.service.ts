import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

export class SensorData {
  date: string;
  sensor: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})

export class SensorService {

  sensorsRef: AngularFireList<SensorData>;
  private dbPath = '/registros/';

  constructor(private db: AngularFireDatabase) { 
    this.sensorsRef = db.list(this.dbPath);

  }

  getAll(): AngularFireList<SensorData> {
    return this.sensorsRef;
  }

  create(sensor: SensorData): any {
    return this.sensorsRef.push(sensor);
  }

  update(key: string, value: any): Promise<void> {
    return this.sensorsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.sensorsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.sensorsRef.remove();
  }
}
