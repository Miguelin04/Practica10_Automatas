package com.unl.automatas.cfgengine;

import com.unl.automatas.cfgengine.dto.ParseResponse;
import com.unl.automatas.cfgengine.dto.ParseRequest;
import com.unl.automatas.cfgengine.parser.Lexer;
import com.unl.automatas.cfgengine.parser.Parser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.StringReader;

@Slf4j
@RestController
@RequestMapping("/api")
public class ParseController {

    @PostMapping("/parse")
    public ResponseEntity<ParseResponse> parseInput(@RequestBody ParseRequest request) {
        log.info("Recibido request de parsing para: {}", request.getInput());
        
        if (request.getInput() == null || request.getInput().isBlank()) {
            return ResponseEntity.badRequest().body(ParseResponse.error("Input no puede estar vacío"));
        }

        try {
            Lexer lexer = new Lexer(new StringReader(request.getInput()));
            Parser parser = new Parser(lexer);

            parser.parse();

            log.info("Parsing exitoso");
            return ResponseEntity.ok(ParseResponse.success(parser.getDerivations()));
        } catch (Exception e) {
            log.error("Error en parsing: {}", e.getMessage(), e);
            return ResponseEntity.ok(ParseResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("CFG Engine API is running");
    }
}
