using IncidentPortal.Domain.Enums;

namespace IncidentPortal.Api.Contracts.Incidents;

public class UpdateStatusRequest
{
    public IncidentStatus Status { get; set; }
}