package org.example;

public class CheckerHit {

    public static boolean hit(float x, float y, float r) {
        return inSquare(x, y, r) || inTriangle(x, y, r) || FourinCircle(x, y, r);
    }

    private static boolean inSquare(float x, float y, float r) {
        return x <= 0 && y <= 0 && -x <= r && -y <= r;
    }

    private static boolean inTriangle(float x, float y, float r) {
        return x >= 0 && y >= 0 && x <= r && y <= r;
    }

    private static boolean FourinCircle(float x, float y, float r) {
        return x >= 0 && y <= 0 && x <= r && -y <= r;
    }
}