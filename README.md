# Var är Vargen v2.1

Firebase-version utan Storage.

## Gör så här
1. Ersätt `index.html` i GitHub-repot.
2. Säkerställ att Firebase Authentication har användarna:
   - linus@vararvargen.se
   - olle@vararvargen.se
   - karl@vararvargen.se
   - gabbe@vararvargen.se
   - micke@vararvargen.se
3. Aktivera Firestore.
4. Sätt temporära testregler i Firestore Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Detta är okej under utveckling, men ska skärpas innan appen används på riktigt.

## Ingår
- Firebase Auth
- Firestore live-data
- Aktiviteter
- Feed utan bildlagring
- Uppdrag och straff
- Poäng
- Crew/Micke-behörighet i gränssnittet
