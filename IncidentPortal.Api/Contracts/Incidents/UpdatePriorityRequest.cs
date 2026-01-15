using IncidentPortal.Domain.Enums;

namespace IncidentPortal.Api.Contracts.Incidents;

public class UpdatePriorityRequest
{
    public IncidentPriority Priority { get; set; }
}