/*
 * Author : Naveen Kumar
 * Date : 17-11-2023
 * Created With : IntelliJ IDEA Community Edition
 */

package com.example.dyte.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.Map;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class LogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String level;
    private String message;
    private String resourceId;
    private String timestamp;
    private String traceId;
    private String spanId;
    private String commit;
    @ElementCollection
    @CollectionTable(name = "log_metadata", joinColumns = @JoinColumn(name = "log_id"))
    @MapKeyColumn(name = "metadata_key")
    @Column(name = "metadata_value")
    private Map<String, String> metadata;
}
