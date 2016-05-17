## Kanban Board App
-- One Column ToDo App --

This single page app is based on an API I built using Django REST framework. The extremely basic app does not currently have a registration feature, so I am the only one who can use it, but the whole project lives on my local host anyway, and I haven't yet learned how to make my API friendly.

If logged in, the main page displays a list of task resources. There is a form to create new tasks, utilizing post requests. The edit and delete functions call put and delete requests respectively. All http requests are made through AJAX, so the page never need be refreshed.
