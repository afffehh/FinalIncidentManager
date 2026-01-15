using IncidentPortal.Domain.Enums;

namespace IncidentPortal.Domain.Entities;

public class Incident
{
    public Guid Id { get; private set; } = Guid.NewGuid();

    public string Title { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;

    public IncidentStatus Status { get; private set; } = IncidentStatus.Open;
    public IncidentPriority Priority { get; private set; } = IncidentPriority.Medium;

    public DateTime CreatedAtUtc { get; private set; } = DateTime.UtcNow;
    public DateTime? UpdatedAtUtc { get; private set; }


    private Incident() { }

    public Incident(string title, string description, IncidentPriority priority = IncidentPriority.Medium)
    {
        SetTitle(title);
        SetDescription(description);
        Priority = priority;

        Status = IncidentStatus.Open;
        CreatedAtUtc = DateTime.UtcNow;
    }

    public void UpdateStatus(IncidentStatus newStatus)
    {
        Status = newStatus;
        UpdatedAtUtc = DateTime.UtcNow;
    }

    public void UpdatePriority(IncidentPriority newPriority)
    {
        Priority = newPriority;
        UpdatedAtUtc = DateTime.UtcNow;
    }

    public void UpdateDetails(string title, string description)
    {
        SetTitle(title);
        SetDescription(description);
        UpdatedAtUtc = DateTime.UtcNow;
    }

    private void SetTitle(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Title is required.", nameof(title));

        Title = title.Trim();
    }

    private void SetDescription(string description)
    {
        if (string.IsNullOrWhiteSpace(description))
            throw new ArgumentException("Description is required.", nameof(description));

        Description = description.Trim();
    }
}