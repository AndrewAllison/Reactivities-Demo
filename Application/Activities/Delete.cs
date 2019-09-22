using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
  public class Delete
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
    }
    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      private ILogger<Delete> _logger { get; }

      public Handler(DataContext context, ILogger<Delete> logger)
      {
        _context = context;
        _logger = logger;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var activity = await _context.Activities.FindAsync(request.Id);
        if (activity == null)
          throw new Exception("Could not find Activity");
        
        _context.Remove(activity);

        var success = await _context.SaveChangesAsync() > 0;
        if (success) return Unit.Value;
        throw new Exception("Problem saving changes");
      }
    }
  }
}