package autoexpenses.dto;

import lombok.Data;

import java.util.stream.Stream;

@Data
public class StatisticExpenseDto {
    public Integer totalCost;
    public Long count;
    public Double maxAmount;
    public Double minAmount;
    public Stream<Object> expenses;
}
