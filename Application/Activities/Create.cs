using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Domain;

namespace Application.Activities
{
  public class Create
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
      public string Title { get; set; }
      public string Description { get; set; }
      public DateTime Date { get; set; }
      public string City { get; set; }
      public string Venue { get; set; }
      public string Category { get; set; }
    }
    public class CommandValidator : AbstractValidator<Command>
    {
      public CommandValidator()
      {
        RuleFor(a => a.Title).NotEmpty();
        RuleFor(a => a.Description).NotEmpty();
        RuleFor(a => a.Category).NotEmpty();
        RuleFor(a => a.Date).NotEmpty();
        RuleFor(a => a.City).NotEmpty();
        RuleFor(a => a.Venue).NotEmpty();
      }
    }
    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      private ILogger<List> _logger { get; }

      public Handler(DataContext context, ILogger<Command> logger)
      {
        _context = context;

      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var activity = new Activity
        {
          Id = request.Id,
          Title = request.Title,
          Description = request.Description,
          Category = request.Category,
          Date = request.Date,
          City = request.City,
          Venue = request.Venue
        };

        _context.Activities.Add(activity);
        var success = await _context.SaveChangesAsync() > 0;

        if (success) return Unit.Value;

        throw new Exception("Problem saving changes");
      }
    }
  }
}
