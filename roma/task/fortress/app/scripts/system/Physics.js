// Just some short-cut renaming
var Box2D;
var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2AABB = Box2D.Collision.b2AABB,
    b2ContactListener = Box2D.Dynamics.b2ContactListener,
    b2RayCastInput = Box2D.Collision.b2RayCastInput,
    b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
    b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
    b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
    b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint,
    b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
    b2WorldManifold = Box2D.Collision.b2WorldManifold,
    b2Shape = Box2D.Collision.Shapes.b2Shape;

var Physics;
(function (Physics) {

    //Physics.worldScale;
    //Physics.world;
    //Physics.debugDraw;
    Physics.fastAcessList = [];

    function addToFastAcessList(body) {
        Physics.fastAcessList.push(body);
    }

    Physics.addToFastAcessList = addToFastAcessList;
    function removeToFastAcessList(body) {
        for (var b in Physics.fastAcessList) {
            if (Physics.fastAcessList[b] === body) {
                Utilies.deleteFromCollection(Physics.fastAcessList, b);
            }
        }
    }

    Physics.removeToFastAcessList = removeToFastAcessList;

    function init(ctx) {
        Physics.worldScale = 30;
        Physics.world = new b2World(new b2Vec2(0, 10), true);
        Physics.debugDraw = new b2DebugDraw();
        Physics.debugDraw.SetSprite(ctx);
        Physics.debugDraw.SetDrawScale(Physics.worldScale);
        Physics.debugDraw.SetFillAlpha(0.3);
        Physics.debugDraw.SetLineThickness(1.0);
        Physics.debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        Physics.world.SetDebugDraw(Physics.debugDraw);


        var listener = new b2ContactListener();
        listener.BeginContact = function (contact) {
            if (contact.GetFixtureA().GetBody().GetUserData() != null &&
                contact.GetFixtureA().GetBody().GetUserData().beginContact != null) {
                contact.GetFixtureA().GetBody().GetUserData().beginContact(contact);
            }

            if (contact.GetFixtureB().GetBody().GetUserData() != null &&
                contact.GetFixtureB().GetBody().GetUserData().beginContact != null) {
                contact.GetFixtureB().GetBody().GetUserData().beginContact(contact);
            }
        };

        listener.EndContact = function (contact) {
            if (contact.GetFixtureA().GetBody().GetUserData() != null &&
                contact.GetFixtureA().GetBody().GetUserData().endContact != null) {
                contact.GetFixtureA().GetBody().GetUserData().endContact(contact);
            }

            if (contact.GetFixtureB().GetBody().GetUserData() != null &&
                contact.GetFixtureB().GetBody().GetUserData().endContact != null) {
                contact.GetFixtureB().GetBody().GetUserData().endContact(contact);
            }
        };

        listener.PostSolve = function (contact, impulse) {
            if (contact.GetFixtureA().GetBody().GetUserData() != null &&
                contact.GetFixtureA().GetBody().GetUserData().postSolve != null) {
                contact.GetFixtureA().GetBody().GetUserData().postSolve(contact, impulse);
            }

            if (contact.GetFixtureB().GetBody().GetUserData() != null &&
                contact.GetFixtureB().GetBody().GetUserData().postSolve != null) {
                contact.GetFixtureB().GetBody().GetUserData().postSolve(contact, impulse);
            }

        };

        listener.PreSolve = function (contact) {
            if (contact.GetFixtureA().GetBody().GetUserData() != null &&
                contact.GetFixtureA().GetBody().GetUserData().preSolve != null) {
                contact.GetFixtureA().GetBody().GetUserData().preSolve(contact);
            }

            if (contact.GetFixtureB().GetBody().GetUserData() != null &&
                contact.GetFixtureB().GetBody().GetUserData().preSolve != null) {
                contact.GetFixtureB().GetBody().GetUserData().preSolve(contact);
            }

        };

        //world.SetContactListener(listener);
    }

    Physics.init = init;

    function isCollisionBetweenTypes(objType1, objType2, contact) {
        var obj1 = contact.GetFixtureA().GetBody().GetUserData();
        var obj2 = contact.GetFixtureB().GetBody().GetUserData();

        if ((obj1 instanceof objType1 || obj1 instanceof objType2) && (obj2 instanceof objType1 || obj2 instanceof objType2)) {
            return true;
        } else {
            return false;
        }
    }

    Physics.isCollisionBetweenTypes = isCollisionBetweenTypes;

    function shotRay(startPiontInMeters, endPiontInMeters) {
        var input = new b2RayCastInput();
        var output = new b2RayCastOutput();
        var intersectionPoint = new b2Vec2();
        var normalEnd = new b2Vec2();
        var intersectionNormal = new b2Vec2();

        endPiontInMeters.Multiply(30);
        endPiontInMeters.Add(startPiontInMeters);

        input.p1 = startPiontInMeters;
        input.p2 = endPiontInMeters;
        input.maxFraction = 1;
        var closestFraction = 1;
        var bodyFound = false;

        var b = new b2BodyDef();
        var f = new b2FixtureDef();
        for (b = Physics.world.GetBodyList(); b; b = b.GetNext()) {
            for (f = b.GetFixtureList(); f; f = f.GetNext()) {
                if (!f.RayCast(output, input))
                    continue;
                else if (output.fraction < closestFraction && output.fraction > 0) {
                    //Fixes bug where I was getting extremely small e numbers
                    // in the lower sections of the physics world. It was causing the
                    // ray to shot only a small disntance from the orign of it.
                    if (output.fraction > 0.001) {
                        closestFraction = output.fraction;
                        intersectionNormal = output.normal;
                        bodyFound = true;
                    }
                }
            }

        }
        intersectionPoint.x = startPiontInMeters.x + closestFraction * (endPiontInMeters.x - startPiontInMeters.x);
        intersectionPoint.y = startPiontInMeters.y + closestFraction * (endPiontInMeters.y - startPiontInMeters.y);

        if (bodyFound) {
            return intersectionPoint;
        }

        return null;
    }

    Physics.shotRay = shotRay;

    function applyToNearByObjects(epicenter, effectedRadius, funcToApplyToEach) {
        var aabb = new b2AABB();
        aabb.lowerBound.Set(epicenter.x - effectedRadius, epicenter.y - effectedRadius);
        aabb.upperBound.Set(epicenter.x + effectedRadius, epicenter.y + effectedRadius);

        Physics.world.QueryAABB(function (fixture) {
            funcToApplyToEach(fixture, epicenter);
            return true;
        }, aabb);
    }

    Physics.applyToNearByObjects = applyToNearByObjects;

    function pixelToMeters(pixels) {
        return pixels / Physics.worldScale;
    }

    Physics.pixelToMeters = pixelToMeters;

    function metersToPixels(meters) {
        return meters * Physics.worldScale;
    }

    Physics.metersToPixels = metersToPixels;

    function vectorPixelToMeters(vPixels) {
        return new b2Vec2(vPixels.x / Physics.worldScale, vPixels.y / Physics.worldScale);
    }

    Physics.vectorPixelToMeters = vectorPixelToMeters;

    function vectorMetersToPixels(vMeters) {
        return new b2Vec2(vMeters.x * Physics.worldScale, vMeters.y * Physics.worldScale);
    }

    Physics.vectorMetersToPixels = vectorMetersToPixels;

    function bodyToDrawingPixelCoordinates(body) {
        var pos = body.GetPosition();
        var radius = body.GetFixtureList().GetShape().GetRadius();
        pos.x -= radius;
        pos.y -= radius;
        return Physics.vectorMetersToPixels(pos);
    }

    Physics.bodyToDrawingPixelCoordinates = bodyToDrawingPixelCoordinates;

})(Physics || (Physics = {}));