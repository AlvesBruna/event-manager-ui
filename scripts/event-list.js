function addTableRow(keys, event, row){
   keys.forEach(key => {
      const td = document.createElement('td');
      td.innerHTML = event[key];
      if(key === 'action') {
         td.className = 'remove-event';
         td.title = 'Remove event';
         td.textContent = 'X';
         td.setAttribute('onclick', `deleteEvent(${event.id})`);
      }
      row.appendChild(td)
   });
}

function addTableHead(table, keys){
   const row = table.insertRow();
   keys.forEach(key => {
      const th = document.createElement('th');
      th.textContent = key.toUpperCase();
      row.appendChild(th)
   })

}

function mapEventToView(events) {
   const eventList = document.querySelector('.event-list');
   eventList.innerHTML = "";
   const table = document.createElement('table');
   const keys = ['id', 'name', 'venue', 'guests', 'action'];
   eventList.appendChild(table)
   addTableHead(table, keys);
   events.map((event) => {
      const row = table.insertRow();
      event.guests = event.guests.join('</br>')
      addTableRow(keys, event, row);
   });
}

function getEvents() {
   const Http = new XMLHttpRequest();
   const url='http://localhost:8000/events/';

   Http.open("GET", url);
   Http.setRequestHeader('Content-type', 'application/json');
   Http.send();

   Http.onreadystatechange = (e) => {
      const response = JSON.parse(Http.responseText);
      if(Http.readyState < 4 || response.error) return;
      mapEventToView(response)
   }
}

function deleteEvent(id){
   const Http = new XMLHttpRequest();
   const url=`http://localhost:8000/events/?id=${id}`;

   Http.open("DELETE", url);
   Http.setRequestHeader('Content-type', 'application/json');
   Http.send();

   Http.onreadystatechange = (e) => {
      const response = Http.responseText;

      if(Http.readyState < 4 || response.error) return;
      getEvents();
   }
}

document.onload = getEvents();