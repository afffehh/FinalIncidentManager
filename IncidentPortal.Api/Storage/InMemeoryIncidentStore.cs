using System.Collections.Concurrent;
using IncidentPortal.Domain.Entities;

namespace IncidentPortal.Api.Storage;

public static class InMemoryIncidentStore
{
    // ConcurrentDictionary = threadsecurity in web applications
    private static readonly ConcurrentDictionary<Guid, Incident> _incidents = new();

    public static IReadOnlyCollection<Incident> GetAll()
        => _incidents.Values.OrderByDescending(i => i.CreatedAtUtc).ToList();

    public static Incident? Get(Guid id)
        => _incidents.TryGetValue(id, out var incident) ? incident : null;

    public static void Add(Incident incident)
        => _incidents[incident.Id] = incident;

    public static bool Update(Incident incident)
    {
        if (!_incidents.ContainsKey(incident.Id))
            return false;

        _incidents[incident.Id] = incident;
        return true;
    }
}