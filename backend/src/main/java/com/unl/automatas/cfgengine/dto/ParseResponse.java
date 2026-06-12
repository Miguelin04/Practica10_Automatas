package com.unl.automatas.cfgengine.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParseResponse {
    private boolean success;
    private Object derivations;
    private String error;
    private long timestamp;

    public static ParseResponse success(Object derivations) {
        return ParseResponse.builder()
                .success(true)
                .derivations(derivations)
                .timestamp(System.currentTimeMillis())
                .build();
    }

    public static ParseResponse error(String message) {
        return ParseResponse.builder()
                .success(false)
                .error(message)
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
