using IncidentPortal.Domain.Enums;

namespace IncidentPortal.Api.Contracts.Incidents;

public class IncidentResponse
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public IncidentStatus Status { get; set; }
    public IncidentPriority Priority { get; set; }

    public DateTime CreatedAtUtc { get; set; }
    public DateTime? UpdatedAtUtc { get; set; }
}