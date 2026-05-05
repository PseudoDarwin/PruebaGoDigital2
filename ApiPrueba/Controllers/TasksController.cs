using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiPrueba.Data;
using ApiPrueba.Models;
using ApiPrueba.DTOs;

namespace ApiPrueba.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/tasks
    //Lista todos los task
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
    {
        var tasks = await _context.Tasks.ToListAsync();

        var result = tasks.Select(t => new TaskDto
        {
            Id = t.Id,
            Title = t.Title,
            Description = t.Description,
            IsCompleted = t.IsCompleted,
            DueDate = t.DueDate
        });

        return Ok(result);
    }

    // POST: api/tasks
    //Se encarga de crear los task
    [HttpPost]
    public async Task<ActionResult> CreateTask(CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            IsCompleted = false
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return Ok(task);
    }

    // PUT: api/tasks/{id}
    //Actualiza la info de task
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateTask(int id, UpdateTaskDto dto)
    {
        var task = await _context.Tasks.FindAsync(id);

        if (task == null)
            return NotFound();

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.IsCompleted = dto.IsCompleted;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/tasks/{id}
    //Borra los taskdotnet run
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);

        if (task == null)
            return NotFound();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}