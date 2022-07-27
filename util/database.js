import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabase('places.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
      )`,
      [],
      () => {
        resolve();
      },
      (_, error) => {
        reject(error);
      },
      ); 
    });
  });
  return promise;
}

export const insertPlace = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      )
    });
  })
  return promise;
}

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql('SELECT * FROM places',
      [],
      (_, result) => {
        const places = [];
        for ( const db of result.rows._array) {
          places.push(
            new Place(
              db.title, 
              db.imageUri,
              {address: db.address, lat: db.lat, lng: db.lng},
              db.id
            )
          )
        }
        resolve(places);
      },
      (_, error) => {
        reject(error);
      })
    });
  });
  return promise;
}

export const fetchPlaceDetails = (id) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql('SELECT * FROM places WHERE id = ?', [id],
      (_, result) => {
        const dbPlace = result.rows._array[0];
        const place = new Place(
          dbPlace.title,
          dbPlace.imageUri,
          {lat: dbPlace.lat, lng: dbPlace.lng, address: dbPlace.address},
          dbPlace.id
        );
        resolve(place);
      },
      (_, error) => {
        reject(error);
      },
      )
    });
  });
  return promise;
}
