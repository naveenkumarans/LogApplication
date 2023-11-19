/*
 * Author : Naveen Kumar
 * Date : 17-11-2023
 * Created With : IntelliJ IDEA Community Edition
 */

package com.example.dyte.repo;

import com.example.dyte.domain.LogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<LogEntity, Long>{

    List<LogEntity> findByLevel(String level);

    List<LogEntity> findByMessage(String message);

    List<LogEntity> findByResourceId(String resourceId);

    List<LogEntity> findByTimestamp(String timestamp);

    List<LogEntity> findByTraceId(String traceId);

    List<LogEntity> findBySpanId(String spanId);

    List<LogEntity> findByCommit(String commit);

    List<LogEntity> findByMetadataContaining(String parentResourceId);

    List<LogEntity> findByLevelContainingOrMessageContainingOrResourceIdContainingOrTimestampContainingOrTraceIdContainingOrSpanIdContainingOrCommitContainingOrMetadataContaining(
            String level, String message, String resourceId, String timestamp, String traceId, String spanId, String commit, String metadata);

    List<LogEntity> findByTimestampBetween(String startTime, String endTime);

}
