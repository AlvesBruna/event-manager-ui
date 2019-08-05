function initialize() {
   const scripts = [
      'form.js',
      'event-list.js'
   ];
   scripts.forEach(script => {
      const el = document.createElement('script');
      el.src = `./scripts/${script}`;
      console.log(el)
      document.head.appendChild(el)
   })
}

document.addEventListener('DOMContentLoaded', function(){
   initialize();
});