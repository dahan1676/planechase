from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.http import JsonResponse
from django.template import loader
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
# from django.utils import simplejson
from random import randrange
from .models import Session, Plane
import json

def index(request):
  session_list = Session.objects.order_by("-session_code")[:5]
  context = {
    "session_list": session_list,
  }
  return render(request, "planechaseSessions/index.html", context)

@csrf_exempt
def makeSession(request, plane_id): 
  if request.method == "POST":
    planes = json.loads(request.body)
    print(planes)
    session = Session.objects.create_session(plane_id, planes)
    plane = get_object_or_404(Plane, pk = plane_id)
    serializedSession = serializers.serialize('json', [ session, plane ])
    return HttpResponse(serializedSession)
  return HttpResponse(False)

@csrf_exempt
def updateSession(request, session_code):
  session = get_object_or_404(Session, pk = session_code)
  if request.method == "POST":
    body = json.loads(request.body)
    if "plane" in body:
      plane_id = body["plane"]["id"]
      plane = get_object_or_404(Plane, pk = plane_id)
      session.plane = plane
    if "planarDeck" in body:
      session.planarDeck = body["planarDeck"]
    if "rollCost" in body:
      session.rollCost = body["rollCost"]
    if "rollResult" in body:
      session.rollResult = body["rollResult"]
    if "discard" in body:
      session.discard = body["discard"]
    # for attribute, value in body:
    #   print(attribute)
    #   print(value)
    #   session.attribute = value
    session.save()
    print(session.plane.id)
    plane = get_object_or_404(Plane, pk = session.plane.id)
    serializedSession = serializers.serialize('json', [ session, plane ])
    return HttpResponse(serializedSession)
  return HttpResponse(False)

def getSession(request, session_code): 
  session = get_object_or_404(Session, pk=session_code)
  plane = get_object_or_404(Plane, pk=session.plane_id)
  serializedSession = serializers.serialize('json', [ session, plane ])
  return HttpResponse(serializedSession)

def getAllPlanes(request):
  planes = Plane.objects.all().values()
  list_planes = [plane for plane in planes]
  return JsonResponse(list_planes, safe=False)

def getWebcamFriendlyPlanes(request):
  planes = Plane.objects.filter(webcamFriendly=True).values()
  list_planes = [plane for plane in planes]
  return JsonResponse(list_planes, safe=False)

def getPlanesFromList(request):
  planes = Plane.objects.filter(webcamFriendly=True).values()
  list_planes = [plane for plane in planes]
  return JsonResponse(list_planes, safe=False)

def getPlane(request, plane_id):
  plane = get_object_or_404(Plane, pk=plane_id)
  serializedPlane = serializers.serialize('json', [ plane, ])
  return HttpResponse(serializedPlane)

def setPlane(request, session_code, plane_id):
  session = get_object_or_404(Session, pk=session_code)
  plane = get_object_or_404(Plane, pk=plane_id)
  session.plane = plane
  session.save()
  return HttpResponse(True)

def setPlaneWithUrl(request, session_code, plane_url):
  session = get_object_or_404(Session, pk=session_code)
  plane = get_object_or_404(Plane, url=plane_url)
  session.plane = plane
  session.save()
  return HttpResponse(True)

def getAndSetNewPlane(request, session_code):
  session = get_object_or_404(Session, pk=session_code)
  randSize = Plane.objects.count()
  randPlaneId = randrange(randSize) + 1
  plane = get_object_or_404(Plane, pk=randPlaneId)
  session.plane = plane
  session.save()
  serializedSession = serializers.serialize('json', [ session, plane ])
  return HttpResponse(serializedSession)

def getRollInfo(request, session_code):
  session = get_object_or_404(Session, pk=session_code)
  serializedRollInfo = serializers.serialize('json', [ session.rollCost, session.rollResult ])
  return HttpResponse(serializedRollInfo)

def setRollInfo(request, session_code, rollCost, rollResult):
  session = get_object_or_404(Session, pk=session_code)
  session.rollCost = rollCost
  session.rollResult = rollResult
  session.save()
  return HttpResponse(True)

def makePlane(request, name, url, set, webcamFriendly):
  plane = Plane.objects.create(name, url, set, webcamFriendly)
  serializedPlane = serializers.serialize('json', [ plane, ])
  return HttpResponse(serializedPlane)