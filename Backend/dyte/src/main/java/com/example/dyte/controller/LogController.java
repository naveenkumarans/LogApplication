/*
 * Author : Naveen Kumar
 * Date : 17-11-2023
 * Created With : IntelliJ IDEA Community Edition
 */

package com.example.dyte.controller;

import com.example.dyte.domain.LogEntity;
import com.example.dyte.service.LogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class LogController {
    private final LogService logService;

    public LogController(LogService logService) {
        this.logService = logService;
    }


    @PostMapping("/log")
    public ResponseEntity<LogEntity> saveLogs(@RequestBody LogEntity logEntity) {
        LogEntity savedLog = logService.saveLogs(logEntity);
        return new ResponseEntity<>(savedLog, HttpStatus.CREATED);
    }

    @GetMapping("/logs")
    public ResponseEntity<List<LogEntity>> getLogList() {
        List<LogEntity> logList = logService.getLogList();
        return new ResponseEntity<>(logList, HttpStatus.OK);
    }

    @GetMapping("/log/{id}")
    public ResponseEntity<LogEntity> getLogsById(@PathVariable long id) {
        Optional<LogEntity> logEntity = logService.getLogsById(id);
        return logEntity
                .map(log -> new ResponseEntity<>(log, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/level/{level}")
    public List<LogEntity> getLogsByLevel(@PathVariable String level) {
        return logService.getLogsByLevel(level);
    }

    @GetMapping("/message/{message}")
    public List<LogEntity> getLogsByMessage(@PathVariable String message) {
        return logService.getLogsByMessage(message);
    }

    @GetMapping("/resourceId/{resourceId}")
    public List<LogEntity> getLogsByResourceId(@PathVariable String resourceId) {
        return logService.getLogsByResourceId(resourceId);
    }

    @GetMapping("/timestamp/{timestamp}")
    public List<LogEntity> getLogsByTimestamp(@PathVariable String timestamp) {
        return logService.getLogsByTimestamp(timestamp);
    }

    @GetMapping("/traceId/{traceId}")
    public List<LogEntity> getLogsByTraceId(@PathVariable String traceId) {
        return logService.getLogsByTraceId(traceId);
    }

    @GetMapping("/spanId/{spanId}")
    public List<LogEntity> getLogsBySpanId(@PathVariable String spanId) {
        return logService.getLogsBySpanId(spanId);
    }

    @GetMapping("/commit/{commit}")
    public List<LogEntity> getLogsByCommit(@PathVariable String commit) {
        return logService.getLogsByCommit(commit);
    }

    @GetMapping("/parentResourceId/{parentResourceId}")
    public List<LogEntity> getLogsByParentResourceId(@PathVariable String parentResourceId) {
        return logService.getLogsByParentResourceId(parentResourceId);
    }

    @GetMapping("/search")
    public ResponseEntity<List<LogEntity>> searchLogs(@RequestParam String query) {
        List<LogEntity> searchResults = logService.searchLogs(query);
        return new ResponseEntity<>(searchResults, HttpStatus.OK);
    }

    @DeleteMapping("log/{id}")
    public ResponseEntity<Void> deleteLogEntityById(@PathVariable long id) {
        logService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/by-timestamp/{startTime}/{endTime}")
    public List<LogEntity> getLogsByTimestampRange(
            @PathVariable String startTime,
            @PathVariable String endTime) {
        return logService.getLogsByTimestampRange(startTime, endTime);
    }
}
