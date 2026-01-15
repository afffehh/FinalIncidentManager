using IncidentPortal.Domain.Enums;

namespace IncidentPortal.Api.Contracts.Incidents;

public class CreateIncidentRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public IncidentPriority Priority { get; set; } = IncidentPriority.Medium;
}
