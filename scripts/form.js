function createGuestElement(guestName) {
   const guestElement = document.createElement('input');

   guestElement.value = guestName;
   guestElement.readOnly =  true;
   guestElement.name = "guests";
   return guestElement;
}

function addGuest() {
   const guestInput = document.querySelector('#guest');
   const guestList = document.querySelector('.guests-list')
   const guestName = guestInput.value;
   const isInvalid = validateGuest(guestName);

   if(isInvalid) return;

   const guestElement = createGuestElement(guestName);
   guestList.appendChild(guestElement);
   guestInput.value = '';
   guestList.scrollTo(0, guestList.scrollHeight)
}

function getGuestList() {
   const guestList = document.querySelectorAll('input[name="guests"]');
   const guestListArray = [];

   for(var {value} of guestList.values()) { 
      guestListArray.push(value);
   }
   return guestListArray;
}

function validateGuest(guestToInclude){
   const guestList = getGuestList();
   const isDuplicate = guestList.some(guestName => guestName === guestToInclude);;

   const isInvalid = !guestToInclude && 'Provide a guest name' 
      || isDuplicate && 'Can\'t add duplicated guest';
   setError(isInvalid);
   return isInvalid;
}

function setError(error) {
   const errorElement = document.querySelector('.error');
   const invalidStyle = error && 'display: block'
   errorElement.textContent = error;
   errorElement.setAttribute('style', invalidStyle);
}

function validateForm({name, venue}, guestList){
   return !name.value && 'Name is required' 
      || !venue.value && 'Venue is required'
      || !guestList.length && 'Guest list is required'
}

function clearForm(){
   const form = document.forms.event;
   const guestList = document.querySelector('.guests-list')
   guestList.innerHTML = "";
   form.reset();
}

function postForm(event) {
   const Http = new XMLHttpRequest();
   const url='http://localhost:8000/events/';

   Http.open("POST", url);
   Http.setRequestHeader('Content-type', 'application/json');
   Http.send(event);

   Http.onreadystatechange = (e) => {
      const response = JSON.parse(Http.responseText);
      if(Http.readyState < 4 || response.error) return;
      getEvents()
      clearForm();
   }
}

function buildEvent({name, venue}, guests){
   return JSON.stringify({
      name: name.value,
      venue: venue.value,
      guests
   });
}

function submitForm() {
   const guests = getGuestList();
   const form = document.forms.event;
   const isFormInvalid = validateForm(form, guests);

   setError(isFormInvalid);
   if (isFormInvalid) return;

   const event = buildEvent(form, guests)
   postForm(event);
}