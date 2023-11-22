import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue, Database } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'urban-weather';

  constructor(public fdb: Database) {

  }

  ngOnInit(): void {
    console.log()
    // import data

    const db = getDatabase();
    const starCountRef = ref(this.fdb);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
    });

  }
}
