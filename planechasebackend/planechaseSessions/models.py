from django.db import models

class PlaneManager(models.Manager):
  def create_plane(self, name, url, set, webcamFriendly):
    plane = self.create(name = name, url = url, set = set, webcamFriendly = webcamFriendly)
    return plane

class Plane(models.Model):
  name = models.TextField()
  url = models.TextField()
  set = models.CharField(max_length = 3)
  webcamFriendly = models.BooleanField()
  objects = PlaneManager()

  def __str__(self):
    return f'Name: {self.name}, Set: {self.set}, Webcam Friendly: {self.webcamFriendly}'

class SessionManager(models.Manager):
  def create_session(self, plane_id, planarDeck):
    session = self.create(plane_id = plane_id, planarDeck = planarDeck)
    return session

class Session(models.Model):
  session_code = models.AutoField(primary_key = True)
  plane = models.ForeignKey(Plane, on_delete = models.CASCADE)
  rollCost = models.IntegerField(default = 0)
  rollResult = models.CharField(max_length = 10, default = "Blank")
  planarDeck = models.JSONField(default = dict)
  discard = models.JSONField(default = dict)
  objects = SessionManager()

  def __str__(self):
    return f'Session Code: {self.session_code}, Plane: {self.plane}, Roll Cost: {self.rollCost}, Roll Result: {self.rollResult}'