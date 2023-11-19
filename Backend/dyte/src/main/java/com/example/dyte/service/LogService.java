/*
 * Author : Naveen Kumar
 * Date : 17-11-2023
 * Created With : IntelliJ IDEA Community Edition
 */

package com.example.dyte.service;

import com.example.dyte.domain.LogEntity;
import lombok.extern.java.Log;

import java.util.List;
import java.util.Optional;

public interface LogService {
   LogEntity saveLogs(LogEntity logEntity);
    List<LogEntity> getLogList();
    Optional<LogEntity> getLogsById(long id);

    List<LogEntity> getLogsByLevel(String level);

    List<LogEntity> getLogsByMessage(String message);

    List<LogEntity> getLogsByResourceId(String resourceId);

    List<LogEntity> getLogsByTimestamp(String timestamp);

    List<LogEntity> getLogsByTraceId(String traceId);

    List<LogEntity> getLogsBySpanId(String spanId);

    List<LogEntity> getLogsByCommit(String commit);

    List<LogEntity> getLogsByParentResourceId(String parentResourceId);
    List<LogEntity> searchLogs(String query);

    void deleteById(long id);
    List<LogEntity> getLogsByTimestampRange(String startTime, String endTime);



}
