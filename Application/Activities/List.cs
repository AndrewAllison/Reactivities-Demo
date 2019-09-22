using Domain;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;

namespace Application.Activities
{
  public class List
  {
    public class Query : IRequest<List<Activity>> { }

    public class Handler : IRequestHandler<Query, List<Activity>>
    {
      private DataContext _context;

      private ILogger<List> _logger { get; }

      public Handler(DataContext context, ILogger<List> logger)
      {
        _context = context;
        _logger = logger;
      }

      public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
      {

        try
        {
          for (int i = 0; i < 10; i++)
          {
            cancellationToken.ThrowIfCancellationRequested();
            await Task.Delay(1000, cancellationToken);
            _logger.LogInformation($"Task {i} has completed");
          }
        }
        catch (Exception exception) when (exception is TaskCanceledException)
        {
          _logger.LogInformation("Task Was Cancelled");
        }

        var Activities = await _context.Activities.ToListAsync();
        return Activities;
      }
    }
  }
}