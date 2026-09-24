// Preserve old bookmarks and notification links while entering the single-document workspace.
(()=>{const file=location.pathname.split('/').pop();if(file&&file!=='index.html'&&file!=='performance.html')location.replace('index.html#/'+file+location.search);})();
