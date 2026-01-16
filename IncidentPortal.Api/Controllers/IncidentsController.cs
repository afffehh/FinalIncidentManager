using IncidentPortal.Api.Contracts.Incidents;
using IncidentPortal.Api.Storage;
using IncidentPortal.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace IncidentPortal.Api.Controllers;

[ApiController]
[Route("api/incidents")]
public class IncidentsController : ControllerBase
{
    [HttpGet]
    public ActionResult<List<IncidentResponse>> GetAll()
    {
        try
        {
            var incidents = InMemoryIncidentStore.GetAll();
            var response = incidents.Select(ToResponse).ToList();
            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while retrieving incidents.", error = ex.Message });
        }
    }

    [HttpGet("{id:guid}")]
    public ActionResult<IncidentResponse> GetById(Guid id)
    {
        var incident = InMemoryIncidentStore.Get(id);
        if (incident is null)
            return NotFound();

        return Ok(ToResponse(incident));
    }

    [HttpPost]
    public ActionResult<IncidentResponse> Create([FromBody] CreateIncidentRequest request)
    {
        try
        {
            var incident = new Incident(request.Title, request.Description, request.Priority);
            InMemoryIncidentStore.Add(incident);

            var response = ToResponse(incident);

            return CreatedAtAction(nameof(GetById), new { id = response.Id }, response);
        }
        catch (ArgumentException ex)
        {
            // enkel validering
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPatch("{id:guid}/status")]
    public ActionResult<IncidentResponse> UpdateStatus(Guid id, [FromBody] UpdateStatusRequest request)
    {
        var incident = InMemoryIncidentStore.Get(id);
        if (incident is null)
            return NotFound();

        incident.UpdateStatus(request.Status);
        InMemoryIncidentStore.Update(incident);

        return Ok(ToResponse(incident));
    }

    [HttpPatch("{id:guid}/priority")]
    public ActionResult<IncidentResponse> UpdatePriority(Guid id, [FromBody] UpdatePriorityRequest request)
    {
        var incident = InMemoryIncidentStore.Get(id);
        if (incident is null)
            return NotFound();

        incident.UpdatePriority(request.Priority);
        InMemoryIncidentStore.Update(incident);

        return Ok(ToResponse(incident));
    }

    private static IncidentResponse ToResponse(Incident incident)
    {
        return new IncidentResponse
        {
            Id = incident.Id,
            Title = incident.Title,
            Description = incident.Description,
            Status = incident.Status,
            Priority = incident.Priority,
            CreatedAtUtc = incident.CreatedAtUtc,
            UpdatedAtUtc = incident.UpdatedAtUtc
        };
    }
}
