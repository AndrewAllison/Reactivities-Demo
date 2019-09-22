using Microsoft.AspNetCore.Mvc;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Domain;
using Application.Activities;
using System;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ActivitiesController : ControllerBase
  {
    private readonly IMediator _mediator;
    public ActivitiesController(IMediator mediator)
    {
      _mediator = mediator;
    }
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
    {
      return await _mediator.Send(new List.Query {}, ct);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> ListDetails(Guid id)
    {
      return await _mediator.Send(new Details.Query { Id = id });
    }
  }
}