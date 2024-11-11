package org.example;
import java.util.HashMap;
import com.fastcgi.*;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Server {
    private static final String HTTP_RESPONSE = """
            HTTP/1.1 200 OK
            Content-Type: application/json
            Content-Length: %d
            
            %s
            """;
    private static final String RESULT_JSON = """
            {
                "времяВыполнения": "%s",
                "сейчас": "%s",
                "результат": %b
            }
            """;

    public static void main(String[] args) {
        var fcgiInterface = new FCGIInterface();
        try {
            while (fcgiInterface.FCGIaccept() >= 0) {
                HashMap<String, String> values = parse(FCGIInterface.request.params.getProperty("QUERY_STRING"));
                if (values == null) {
                    sendJson("{\"ошибка\": \"Не удалось разобрать параметры запроса\"}");
                    continue;
                }

                float x, y, r;
                try {
                    x = Float.parseFloat(values.get("x").replace(",", "."));  // Учитываем замену запятой на точку
                    y = Float.parseFloat(values.get("y").replace(",", "."));
                    r = Float.parseFloat(values.get("r").replace(",", "."));
                } catch (NumberFormatException e) {
                    sendJson("{\"ошибка\": \"Некорректный формат числовых значений\"}");
                    continue;
                }

                if (Validator.validateX(x) && Validator.validateY(y) && Validator.validateR(r)) {
                    long startTime = System.nanoTime();
                    boolean isHit = CheckerHit.hit(x, y, r);
                    long endTime = System.nanoTime();

                    String executionTime = String.format("%d наносекунд", (endTime - startTime));
                    String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss"));

                    sendJson(String.format(RESULT_JSON, executionTime, currentTime, isHit));
                } else {
                    sendJson("{\"ошибка\": \"Некорректные значения параметров\"}");
                }
            }
        } catch (Exception e) {
            sendJson(String.format("{\"ошибка\": \"Общая ошибка сервера: %s\"}", e.toString()));
        }
    }

    private static void sendJson(String json) {
        System.out.println(String.format(HTTP_RESPONSE, json.getBytes(StandardCharsets.UTF_8).length, json));
    }

    private static HashMap<String, String> parse(String queryString) {
        if (queryString == null || queryString.isEmpty()) {
            return null;
        }
        HashMap<String, String> args = new HashMap<>();
        for (String pair : queryString.split("&")) {
            String[] keyValue = pair.split("=");
            if (keyValue.length > 1) {
                args.put(keyValue[0], keyValue[1]);
            } else {
                args.put(keyValue[0], "");
            }
        }
        return args;
    }
}