/*
 * Author : Naveen Kumar
 * Date : 17-11-2023
 * Created With : IntelliJ IDEA Community Edition
 */

package com.example.dyte.service;

import com.example.dyte.domain.LogEntity;
import com.example.dyte.repo.LogRepository;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LogServiceImpl implements LogService {
    LogRepository logRepository;

    public LogServiceImpl(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @Override
    public LogEntity saveLogs(LogEntity logEntity) {
        return logRepository.save(logEntity);
    }

    @Override
    public List<LogEntity> getLogList() {
        return logRepository.findAll();
    }

    @Override
    public Optional<LogEntity> getLogsById(long id) {
        return logRepository.findById(id);
    }

    @Override
    public List<LogEntity> getLogsByLevel(String level) {
        return logRepository.findByLevel(level);
    }

    @Override
    public List<LogEntity> getLogsByMessage(String message) {
        return logRepository.findByMessage(message);
    }

    @Override
    public List<LogEntity> getLogsByResourceId(String resourceId) {
        return logRepository.findByResourceId(resourceId);
    }

    @Override
    public List<LogEntity> getLogsByTimestamp(String timestamp) {
        return logRepository.findByTimestamp(timestamp);
    }

    @Override
    public List<LogEntity> getLogsByTraceId(String traceId) {
        return logRepository.findByTraceId(traceId);
    }

    @Override
    public List<LogEntity> getLogsBySpanId(String spanId) {
        return logRepository.findBySpanId(spanId);
    }

    @Override
    public List<LogEntity> getLogsByCommit(String commit) {
        return logRepository.findByCommit(commit);
    }

    @Override
    public List<LogEntity> getLogsByParentResourceId(String parentResourceId) {

        return logRepository.findByMetadataContaining("\"parentResourceId\":\"" + parentResourceId + "\"");
    }
    @Override
    public List<LogEntity> searchLogs(String query) {
        return logRepository.findByLevelContainingOrMessageContainingOrResourceIdContainingOrTimestampContainingOrTraceIdContainingOrSpanIdContainingOrCommitContainingOrMetadataContaining(query, query, query, query, query, query, query, query);
    }
    @Override
    public void deleteById(long id) {
        logRepository.deleteById(id);
    }

    @Override
    public List<LogEntity> getLogsByTimestampRange(String startTime, String endTime) {
        return logRepository.findByTimestampBetween(startTime, endTime);
    }

}
