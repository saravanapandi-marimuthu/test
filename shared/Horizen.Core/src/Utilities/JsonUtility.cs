using System.ComponentModel;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Horizen.Core.Utilities;

public static class JsonUtility
{
    public static string Serialize<T>(T obj)
    {
        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true,
            Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) },
        };

        return JsonSerializer.Serialize(obj, jsonOptions);
    }

    public static T? Deserialize<T>(string json)
    {
        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true,
            Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) },
        };

        return JsonSerializer.Deserialize<T>(json, jsonOptions);
    }

    public static async Task<T> LoadFromFileAsync<T>(string path)
    {
        if (!File.Exists(path))
        {
            throw new FileNotFoundException($"File not found: {path}", path);
        }

        var json = await File.ReadAllTextAsync(path);
        return Deserialize<T>(json)!;
    }
}

public class SafeEnumConverter<T> : JsonConverter<T>
    where T : struct, Enum
{
    public override T Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        var value = reader.GetString();
        if (Enum.TryParse(typeToConvert, value, ignoreCase: true, out var result))
        {
            return (T)result;
        }
        return default; // Or any other default value
    }

    public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }
}
