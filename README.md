# Cloisonnages

Application de gestion des salles modulables, 




Généralité

Nous aimerions créer une application de gestion de salles modulables qui donne aux équipes de la DPIET des tâches de cloisonnements à réaliser pendant des créneaux définis. 

L’application doit récupérer les données de réservation de salles de Geode via des requêtes SOAP au webservice Geode. 

Puis elle doit transformer ses données en liste de tâches de cloisonnement et de décloisonnements grâce à un algorithme. Ces tâches doivent respecter un certain format.

Alors elle peut les afficher à la DPIET.



La DPIET

La DPIET doit s’authentifier et peut alors:

-	Lire les tâches triées par urgence (avec un indicateur coloré en plus)

-	Pour chaque tâche, notifier si elle l’a réalisée ou non (si la deadline n’est pas dépassée)

-	Sélectionner si elle préfère voir les tâches du mois, de la semaine, ou l’historique des tâches

-	Voir quand les tâches ont été actualisées pour la dernière fois


Tâche de cloisonnement

Une tâche de cloisonnement est composée de :

-	Une salle (modulable)

-	Une opération (cloisonner/décloisonner)

-	Date de début (norme ISO 8601)
-	Date de fin (norme ISO 8601)

-	Statut (fait/à faire)


Fonctionnalités espérées après la soutenance
Authentification CAS ( pour l’instant authentification avec passport )

Implémentation technique.
Nous développerons un site web Responsive.

Site Web
UI Responsive (dont l’interface utilisateur s’adapte en fonction de l’affichage mobile, tablette, ordinateur)

Back end

Runtime NodeJS
API Rest http : Express

Accès aux données : Mongoose
Persistance : MongoDB

Front end

Framework JS : React
Framework CSS : Bootstrap
