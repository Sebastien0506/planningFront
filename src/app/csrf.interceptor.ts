import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
//On crée un fonction pour lire le csrfToken
function readCookie(name: string) : string | null {
  //On declare une variable pour stocker le csrf
  const csrf = document.cookie
      .split(';') // On découpe les valeurs reçut
      .find(row => row.startsWith('csrftoken=')) // On récupère celle qui commence par 'csrftoken'
      ?.split('=')[1]; // On récupère la valeur après le "="
 console.log(csrf);
  
  console.log('Cookie actuels : ', document.cookie);
  return csrf || null;
}
export function csrfInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) : Observable<HttpEvent<any>> {
  //On appel la function readCookie
  const csrfToken = readCookie('csrftoken');

  // On définit les méthode qui doivent utiliser le jeton csrf
  if (csrfToken && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)){
    //On clone la requête et on met le token dedans
    const csrfReq = req.clone({
        withCredentials: true,
        setHeaders: {
          'X-CSRFToken': csrfToken
        }
    });
    return next(csrfReq)
  }
  return next(req.clone({withCredentials: true}));
}
