package com.unl.automatas.cfgengine;

import com.unl.automatas.cfgengine.parser.Lexer;
import com.unl.automatas.cfgengine.parser.Parser;
import org.springframework.web.bind.annotation.*;

import java.io.StringReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/parse")
@CrossOrigin(origins = "*")
public class ParseController {

    @PostMapping
    public Map<String, Object> parseInput(@RequestBody Map<String, String> payload) {
        String input = payload.get("input");
        Map<String, Object> response = new HashMap<>();

        try {
            Lexer lexer = new Lexer(new StringReader(input));
            Parser parser = new Parser(lexer);

            parser.parse();

            response.put("success", true);
            response.put("derivations", parser.getDerivations());
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
        }

        return response;
    }
}
