from django.urls import path
from . import views

urlpatterns = [
  path("", views.index, name="index"),
  path("makeSession/<int:plane_id>/", views.makeSession, name="makeSession"),
  path("getSession/<str:session_code>/", views.getSession, name="getSession"),
  path("updateSession/<str:session_code>/", views.updateSession, name="updateSession"),
  path("getAllPlanes/", views.getAllPlanes, name="getAllPlanes"),
  path("getWebcamFriendlyPlanes/", views.getWebcamFriendlyPlanes, name="getWebcamFriendlyPlanes"),
  path("getPlanesFromList/", views.getPlanesFromList, name="getPlanesFromList"),
  path("getPlane/<int:plane_id>/", views.getPlane, name="getPlane"),
  path("setPlane/<str:session_code>/<int:plane_id>/", views.setPlane, name="setPlane"),
  path("getRollInfo/<str:session_code>/", views.getRollInfo, name="getRollInfo"),
  path("setRollInfo/<str:session_code>/<int:rollCost>/<str:rollResult>", views.setRollInfo, name="setRollInfo"),
]