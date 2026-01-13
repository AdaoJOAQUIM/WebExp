# 🚀 Portfolio Professionnel - Full Stack Application

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![Node](https://img.shields.io/badge/Node.js-Express-339933.svg)

Une application fullstack ultra moderne pour portfolio professionnel, entièrement déployée sur GitHub avec backend, frontend et base de données.

## ✨ Fonctionnalités

- 🎨 **Interface Moderne**: Design responsive avec Tailwind CSS
- 🌓 **Mode Sombre/Clair**: Changement de thème avec persistance localStorage
- ⚡ **Animations Fluides**: Transitions et animations CSS personnalisées
- 📱 **100% Responsive**: Optimisé pour mobile, tablette et desktop
- 🔌 **API RESTful**: Backend Express.js avec endpoints complets
- 💾 **Système de Base de Données**: Stockage JSON avec opérations CRUD
- 📧 **Formulaire de Contact**: Fonctionnel avec validation et stockage
- 🎯 **Gestion de Projets**: Affichage dynamique avec filtres
- 📊 **Visualisation des Compétences**: Barres de progression animées
- 🚀 **Déploiement Automatique**: CI/CD avec GitHub Actions

## 🛠️ Stack Technique

### Frontend
- **React 18.2** - Bibliothèque UI
- **Vite 5.0** - Build tool ultra-rapide
- **Tailwind CSS 3.3** - Framework CSS utility-first
- **Animations CSS** - Transitions et effets personnalisés

### Backend
- **Node.js** - Runtime JavaScript
- **Express 4.18** - Framework web
- **CORS** - Gestion des requêtes cross-origin
- **JSON Database** - Système de stockage léger

### DevOps
- **GitHub Actions** - CI/CD automatisé
- **GitHub Pages** - Hébergement statique gratuit
- **ESLint** - Linting du code
- **Prettier** - Formatage du code

## 📁 Structure du Projet

```
WebExp/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Configuration GitHub Actions
├── data/
│   ├── projects.json          # Données des projets
│   ├── skills.json            # Données des compétences
│   ├── profile.json           # Profil et expérience
│   └── messages.json          # Messages du formulaire de contact
├── server/
│   ├── api/
│   │   ├── projects.js        # Routes API projets
│   │   ├── skills.js          # Routes API compétences
│   │   ├── profile.js         # Routes API profil
│   │   └── contact.js         # Routes API contact
│   ├── db/
│   │   └── database.js        # Gestionnaire de base de données
│   └── index.js               # Serveur Express principal
├── src/
│   ├── components/
│   │   ├── Header.jsx         # En-tête avec navigation
│   │   ├── Hero.jsx           # Section hero avec animation
│   │   ├── About.jsx          # Section à propos
│   │   ├── Skills.jsx         # Compétences avec barres de progression
│   │   ├── Projects.jsx       # Portfolio de projets
│   │   ├── Experience.jsx     # Timeline d'expérience
│   │   ├── Contact.jsx        # Formulaire de contact
│   │   └── Footer.jsx         # Pied de page
│   ├── styles/
│   │   └── index.css          # Styles globaux et Tailwind
│   ├── App.jsx                # Composant principal
│   └── main.jsx               # Point d'entrée React
├── public/                     # Assets statiques
├── .env.example               # Variables d'environnement exemple
├── .gitignore                 # Fichiers ignorés par Git
├── index.html                 # Page HTML principale
├── package.json               # Dépendances et scripts
├── postcss.config.js          # Configuration PostCSS
├── tailwind.config.js         # Configuration Tailwind
├── vite.config.js             # Configuration Vite
└── README.md                  # Documentation (ce fichier)
```

## 🚀 Installation et Démarrage

### Prérequis

- Node.js 18+ et npm
- Git

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/AdaoJOAQUIM/WebExp.git
cd WebExp
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration**
```bash
cp .env.example .env
# Modifier .env avec vos configurations
```

### Développement

**Démarrer le frontend (Vite)**
```bash
npm run dev
```
Ouvre http://localhost:3000

**Démarrer le backend (Express)**
```bash
npm run server
```
API disponible sur http://localhost:5000

### Production

**Build du projet**
```bash
npm run build
```

**Prévisualiser le build**
```bash
npm run preview
```

**Déployer sur GitHub Pages**
```bash
npm run deploy
```

## 📡 API Endpoints

### Projects
- `GET /api/projects` - Récupérer tous les projets
- `GET /api/projects/:id` - Récupérer un projet spécifique
- `POST /api/projects` - Ajouter un nouveau projet

### Skills
- `GET /api/skills` - Récupérer toutes les compétences

### Profile
- `GET /api/profile` - Récupérer le profil
- `GET /api/profile/experience` - Récupérer l'expérience

### Contact
- `POST /api/contact` - Envoyer un message
- `GET /api/contact` - Récupérer tous les messages

### Health Check
- `GET /api/health` - Vérifier le statut de l'API

## 🎨 Personnalisation

### Modifier les Données

1. **Profil**: Éditez `data/profile.json`
```json
{
  "profile": {
    "name": "Votre Nom",
    "title": "Votre Titre",
    "bio": "Votre bio...",
    ...
  }
}
```

2. **Projets**: Éditez `data/projects.json`
```json
{
  "projects": [
    {
      "title": "Nom du Projet",
      "description": "Description...",
      "technologies": ["React", "Node.js"],
      ...
    }
  ]
}
```

3. **Compétences**: Éditez `data/skills.json`
```json
{
  "skills": {
    "frontend": [
      { "name": "React", "level": 95, "icon": "⚛️" }
    ]
  }
}
```

### Personnaliser les Couleurs

Éditez `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#votre-couleur',
        ...
      }
    }
  }
}
```

### Modifier l'URL de Déploiement

Dans `vite.config.js`, changez la propriété `base`:
```javascript
export default defineConfig({
  base: '/votre-repo-name/',
  ...
})
```

## 🌐 Déploiement sur GitHub Pages

### Configuration GitHub

1. **Settings → Pages**
   - Source: GitHub Actions

2. **Push vers la branche**
```bash
git add .
git commit -m "Initial commit"
git push -u origin claude/fullstack-github-deploy-0yjw3
```

3. **Déploiement Automatique**
   - GitHub Actions build et déploie automatiquement
   - Accessible sur: `https://username.github.io/WebExp/`

## 🔧 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Démarre le serveur de développement Vite |
| `npm run build` | Build le projet pour production |
| `npm run preview` | Prévisualise le build de production |
| `npm run server` | Démarre le serveur backend Express |
| `npm run deploy` | Build et déploie sur GitHub Pages |

## 🎯 Fonctionnalités Avancées

### Mode Sombre
- Persistance avec localStorage
- Transition fluide entre les thèmes
- Icône de toggle animée

### Animations
- Hero avec effet de typing
- Blobs animés en arrière-plan
- Cartes avec hover effects
- Timeline d'expérience interactive
- Barres de progression animées

### Responsive Design
- Mobile-first approach
- Menu hamburger pour mobile
- Grilles adaptatives
- Images optimisées

## 📝 TODO et Améliorations

- [ ] Intégrer un vrai service d'email (SendGrid, Nodemailer)
- [ ] Ajouter l'authentification admin
- [ ] Implémenter un CMS pour gérer le contenu
- [ ] Ajouter des tests unitaires et E2E
- [ ] Optimiser les images avec lazy loading
- [ ] Ajouter PWA support
- [ ] Implémenter analytics (Google Analytics)
- [ ] Ajouter un blog section
- [ ] Intégrer i18n pour multi-langues

## 🤝 Contribution

Les contributions sont les bienvenues! N'hésitez pas à:

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

**Votre Nom**
- GitHub: [@AdaoJOAQUIM](https://github.com/AdaoJOAQUIM)
- LinkedIn: [Votre Profil](https://linkedin.com/in/votre-profil)

## 🙏 Remerciements

- React Team pour React
- Tailwind Labs pour Tailwind CSS
- Vite Team pour l'outil de build ultra-rapide
- Communauté Open Source

---

**⭐ Si ce projet vous a aidé, n'hésitez pas à lui donner une étoile!**

Fait avec ❤️ et React
